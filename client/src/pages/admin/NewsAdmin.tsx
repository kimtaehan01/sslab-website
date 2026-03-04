/**
 * Admin News Management — CRUD for news/announcements
 */
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Newspaper, Pin } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type NewsCategory = "announcement" | "achievement" | "event" | "other";

const categoryLabels: Record<NewsCategory, string> = {
  announcement: "공지사항",
  achievement: "성과",
  event: "행사",
  other: "기타",
};

const categoryColors: Record<NewsCategory, string> = {
  announcement: "bg-blue-100 text-blue-700",
  achievement: "bg-green-100 text-green-700",
  event: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-700",
};

interface NewsForm {
  title: string;
  content: string;
  category: NewsCategory;
  pinned: number;
}

const emptyForm: NewsForm = {
  title: "",
  content: "",
  category: "announcement",
  pinned: 0,
};

export default function NewsAdmin() {
  const utils = trpc.useUtils();
  const newsList = trpc.news.list.useQuery();
  const createNews = trpc.news.create.useMutation({
    onSuccess: () => { utils.news.list.invalidate(); toast.success("소식이 추가되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const updateNews = trpc.news.update.useMutation({
    onSuccess: () => { utils.news.list.invalidate(); toast.success("소식이 수정되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const deleteNews = trpc.news.delete.useMutation({
    onSuccess: () => { utils.news.list.invalidate(); toast.success("소식이 삭제되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<NewsForm>(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      content: item.content || "",
      category: item.category,
      pinned: item.pinned,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title) {
      toast.error("제목은 필수입니다.");
      return;
    }
    const data = {
      title: form.title,
      content: form.content || null,
      category: form.category,
      pinned: form.pinned,
    };

    if (editingId) {
      await updateNews.mutateAsync({ id: editingId, data });
    } else {
      await createNews.mutateAsync(data);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteNews.mutateAsync({ id: deleteId });
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy">소식 관리</h1>
          <p className="text-muted-foreground text-sm mt-1">공지사항, 성과, 행사 등 소식을 관리합니다.</p>
        </div>
        <Button onClick={openCreate} className="bg-signal-red hover:bg-signal-red/90 text-white font-heading">
          <Plus size={16} className="mr-2" />
          소식 추가
        </Button>
      </div>

      {newsList.isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : !newsList.data?.length ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <Newspaper size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">등록된 소식이 없습니다.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4 font-heading text-xs">
            <Plus size={14} className="mr-1" />
            첫 소식 추가하기
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {newsList.data.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-border rounded-lg p-4 hover:border-signal-red/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.pinned === 1 && (
                      <Pin size={12} className="text-signal-red shrink-0" />
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${categoryColors[item.category as NewsCategory]}`}>
                      {categoryLabels[item.category as NewsCategory]}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {format(new Date(item.publishedAt), "yyyy.MM.dd")}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-navy text-sm">{item.title}</h3>
                  {item.content && (
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.content}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 hover:bg-muted rounded-md transition-colors" title="수정">
                    <Pencil size={14} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => { setDeleteId(item.id); setDeleteDialogOpen(true); }} className="p-2 hover:bg-red-50 rounded-md transition-colors" title="삭제">
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
              {editingId ? "소식 수정" : "소식 추가"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">제목 *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="소식 제목"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">내용</label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="소식 내용..."
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">분류</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as NewsCategory })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">공지사항</SelectItem>
                    <SelectItem value="achievement">성과</SelectItem>
                    <SelectItem value="event">행사</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">고정</label>
                <Select value={String(form.pinned)} onValueChange={(v) => setForm({ ...form, pinned: parseInt(v) })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">일반</SelectItem>
                    <SelectItem value="1">상단 고정</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
            <Button
              onClick={handleSubmit}
              className="bg-signal-red hover:bg-signal-red/90 text-white"
              disabled={createNews.isPending || updateNews.isPending}
            >
              {createNews.isPending || updateNews.isPending ? "저장 중..." : editingId ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>소식 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 이 소식을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
