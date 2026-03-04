/**
 * Admin Research Areas Management — CRUD for research areas
 */
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, FlaskConical } from "lucide-react";
import { toast } from "sonner";

interface ResearchForm {
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  imageUrl: string;
  topics: string;
  sortOrder: number;
}

const emptyForm: ResearchForm = {
  title: "",
  titleEn: "",
  description: "",
  icon: "Terminal",
  imageUrl: "",
  topics: "",
  sortOrder: 0,
};

const iconOptions = ["Terminal", "Code2", "Shield", "Cpu", "Database", "Globe", "Layers", "Zap"];

export default function ResearchAdmin() {
  const utils = trpc.useUtils();
  const researchAreas = trpc.researchAreas.list.useQuery();
  const createArea = trpc.researchAreas.create.useMutation({
    onSuccess: () => { utils.researchAreas.list.invalidate(); toast.success("연구분야가 추가되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const updateArea = trpc.researchAreas.update.useMutation({
    onSuccess: () => { utils.researchAreas.list.invalidate(); toast.success("연구분야가 수정되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const deleteArea = trpc.researchAreas.delete.useMutation({
    onSuccess: () => { utils.researchAreas.list.invalidate(); toast.success("연구분야가 삭제되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<ResearchForm>(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (area: any) => {
    setEditingId(area.id);
    setForm({
      title: area.title,
      titleEn: area.titleEn,
      description: area.description,
      icon: area.icon,
      imageUrl: area.imageUrl || "",
      topics: area.topics,
      sortOrder: area.sortOrder,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.titleEn || !form.description || !form.topics) {
      toast.error("제목, 영문 제목, 설명, 연구 주제는 필수입니다.");
      return;
    }
    const data = {
      title: form.title,
      titleEn: form.titleEn,
      description: form.description,
      icon: form.icon,
      imageUrl: form.imageUrl || null,
      topics: form.topics,
      sortOrder: form.sortOrder,
    };

    if (editingId) {
      await updateArea.mutateAsync({ id: editingId, data });
    } else {
      await createArea.mutateAsync(data);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteArea.mutateAsync({ id: deleteId });
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy">연구분야 관리</h1>
          <p className="text-muted-foreground text-sm mt-1">연구 분야와 세부 주제를 관리합니다.</p>
        </div>
        <Button onClick={openCreate} className="bg-signal-red hover:bg-signal-red/90 text-white font-heading">
          <Plus size={16} className="mr-2" />
          연구분야 추가
        </Button>
      </div>

      {researchAreas.isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : !researchAreas.data?.length ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <FlaskConical size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">등록된 연구분야가 없습니다.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4 font-heading text-xs">
            <Plus size={14} className="mr-1" />
            첫 연구분야 추가하기
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {researchAreas.data.map((area) => (
            <div
              key={area.id}
              className="bg-white border border-border rounded-lg p-5 hover:border-signal-red/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-navy">{area.title}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground">{area.titleEn}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{area.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.topics.split(",").map((topic: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {topic.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(area)} className="p-2 hover:bg-muted rounded-md transition-colors" title="수정">
                    <Pencil size={14} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => { setDeleteId(area.id); setDeleteDialogOpen(true); }} className="p-2 hover:bg-red-50 rounded-md transition-colors" title="삭제">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingId ? "연구분야 수정" : "연구분야 추가"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">제목 (한글) *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="운영체제"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">제목 (영문) *</label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="Operating Systems"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">설명 *</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="연구 분야에 대한 상세 설명..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">아이콘</label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setForm({ ...form, icon })}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                      form.icon === icon
                        ? "border-signal-red bg-signal-red/10 text-signal-red"
                        : "border-border text-muted-foreground hover:border-signal-red/30"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">이미지 URL</label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">연구 주제 * (쉼표로 구분)</label>
              <Textarea
                value={form.topics}
                onChange={(e) => setForm({ ...form, topics: e.target.value })}
                placeholder="리눅스 커널 최적화, 실시간 스케줄링, 가상화 기술"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">정렬 순서</label>
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
            <Button
              onClick={handleSubmit}
              className="bg-signal-red hover:bg-signal-red/90 text-white"
              disabled={createArea.isPending || updateArea.isPending}
            >
              {createArea.isPending || updateArea.isPending ? "저장 중..." : editingId ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>연구분야 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 이 연구분야를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
