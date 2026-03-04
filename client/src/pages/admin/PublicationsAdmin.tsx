/**
 * Admin Publications Management — CRUD for papers
 */
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, BookOpen, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type PubCategory = "journal" | "conference" | "workshop" | "thesis" | "other";

const categoryLabels: Record<PubCategory, string> = {
  journal: "학술지",
  conference: "학회",
  workshop: "워크숍",
  thesis: "학위논문",
  other: "기타",
};

interface PubForm {
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: PubCategory;
  doi: string;
  link: string;
  abstract: string;
  sortOrder: number;
}

const emptyForm: PubForm = {
  title: "",
  authors: "",
  venue: "",
  year: new Date().getFullYear(),
  category: "conference",
  doi: "",
  link: "",
  abstract: "",
  sortOrder: 0,
};

export default function PublicationsAdmin() {
  const utils = trpc.useUtils();
  const publications = trpc.publications.list.useQuery();
  const createPub = trpc.publications.create.useMutation({
    onSuccess: () => { utils.publications.list.invalidate(); toast.success("출판물이 추가되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const updatePub = trpc.publications.update.useMutation({
    onSuccess: () => { utils.publications.list.invalidate(); toast.success("출판물이 수정되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const deletePub = trpc.publications.delete.useMutation({
    onSuccess: () => { utils.publications.list.invalidate(); toast.success("출판물이 삭제되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<PubForm>(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (pub: any) => {
    setEditingId(pub.id);
    setForm({
      title: pub.title,
      authors: pub.authors,
      venue: pub.venue,
      year: pub.year,
      category: pub.category,
      doi: pub.doi || "",
      link: pub.link || "",
      abstract: pub.abstract || "",
      sortOrder: pub.sortOrder,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.authors || !form.venue) {
      toast.error("제목, 저자, 게재지는 필수입니다.");
      return;
    }
    const data = {
      title: form.title,
      authors: form.authors,
      venue: form.venue,
      year: form.year,
      category: form.category,
      doi: form.doi || null,
      link: form.link || null,
      abstract: form.abstract || null,
      sortOrder: form.sortOrder,
    };

    if (editingId) {
      await updatePub.mutateAsync({ id: editingId, data });
    } else {
      await createPub.mutateAsync(data);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deletePub.mutateAsync({ id: deleteId });
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy">출판물 관리</h1>
          <p className="text-muted-foreground text-sm mt-1">학술지, 학회, 워크숍 논문을 관리합니다.</p>
        </div>
        <Button onClick={openCreate} className="bg-signal-red hover:bg-signal-red/90 text-white font-heading">
          <Plus size={16} className="mr-2" />
          출판물 추가
        </Button>
      </div>

      {publications.isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : !publications.data?.length ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <BookOpen size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">등록된 출판물이 없습니다.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4 font-heading text-xs">
            <Plus size={14} className="mr-1" />
            첫 출판물 추가하기
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {publications.data.map((pub) => (
            <div
              key={pub.id}
              className="bg-white border border-border rounded-lg p-4 hover:border-signal-red/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded font-mono text-muted-foreground">
                      {categoryLabels[pub.category as PubCategory]}
                    </span>
                    <span className="text-[10px] font-mono text-signal-red">{pub.year}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-sm leading-snug">{pub.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{pub.authors}</p>
                  <p className="text-muted-foreground text-xs mt-0.5 italic">{pub.venue}</p>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-steel-blue text-xs mt-1 hover:text-signal-red">
                      <ExternalLink size={10} /> 링크
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(pub)} className="p-2 hover:bg-muted rounded-md transition-colors" title="수정">
                    <Pencil size={14} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => { setDeleteId(pub.id); setDeleteDialogOpen(true); }} className="p-2 hover:bg-red-50 rounded-md transition-colors" title="삭제">
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
              {editingId ? "출판물 수정" : "출판물 추가"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">제목 *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="논문 제목"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">저자 *</label>
              <Input
                value={form.authors}
                onChange={(e) => setForm({ ...form, authors: e.target.value })}
                placeholder="홍길동, 김철수, ..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">게재지 *</label>
                <Input
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="학술지/학회명"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">연도 *</label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2024 })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">분류 *</label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as PubCategory })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="journal">학술지</SelectItem>
                  <SelectItem value="conference">학회</SelectItem>
                  <SelectItem value="workshop">워크숍</SelectItem>
                  <SelectItem value="thesis">학위논문</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">DOI</label>
                <Input
                  value={form.doi}
                  onChange={(e) => setForm({ ...form, doi: e.target.value })}
                  placeholder="10.xxxx/..."
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">링크</label>
                <Input
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">초록</label>
              <Textarea
                value={form.abstract}
                onChange={(e) => setForm({ ...form, abstract: e.target.value })}
                placeholder="논문 초록..."
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
              disabled={createPub.isPending || updatePub.isPending}
            >
              {createPub.isPending || updatePub.isPending ? "저장 중..." : editingId ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>출판물 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 이 출판물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
