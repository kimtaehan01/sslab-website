/**
 * Admin Members Management — CRUD for lab members
 */
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, GraduationCap, User, Briefcase } from "lucide-react";
import { toast } from "sonner";

type MemberCategory = "professor" | "graduate" | "undergraduate" | "alumni";

const categoryLabels: Record<MemberCategory, string> = {
  professor: "교수",
  graduate: "대학원생",
  undergraduate: "학부연구생",
  alumni: "졸업생",
};

const categoryIcons: Record<MemberCategory, typeof User> = {
  professor: GraduationCap,
  graduate: User,
  undergraduate: User,
  alumni: Briefcase,
};

interface MemberForm {
  name: string;
  nameEn: string;
  category: MemberCategory;
  role: string;
  research: string;
  email: string;
  imageUrl: string;
  homepage: string;
  graduationYear: string;
  currentPosition: string;
  sortOrder: number;
}

const emptyForm: MemberForm = {
  name: "",
  nameEn: "",
  category: "graduate",
  role: "",
  research: "",
  email: "",
  imageUrl: "",
  homepage: "",
  graduationYear: "",
  currentPosition: "",
  sortOrder: 0,
};

export default function MembersAdmin() {
  const utils = trpc.useUtils();
  const members = trpc.members.list.useQuery();
  const createMember = trpc.members.create.useMutation({
    onSuccess: () => { utils.members.list.invalidate(); toast.success("구성원이 추가되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const updateMember = trpc.members.update.useMutation({
    onSuccess: () => { utils.members.list.invalidate(); toast.success("구성원 정보가 수정되었습니다."); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMember = trpc.members.delete.useMutation({
    onSuccess: () => { utils.members.list.invalidate(); toast.success("구성원이 삭제되었습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (member: any) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      nameEn: member.nameEn || "",
      category: member.category,
      role: member.role,
      research: member.research || "",
      email: member.email || "",
      imageUrl: member.imageUrl || "",
      homepage: member.homepage || "",
      graduationYear: member.graduationYear || "",
      currentPosition: member.currentPosition || "",
      sortOrder: member.sortOrder,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) {
      toast.error("이름과 역할은 필수입니다.");
      return;
    }
    const data = {
      name: form.name,
      nameEn: form.nameEn || null,
      category: form.category,
      role: form.role,
      research: form.research || null,
      email: form.email || null,
      imageUrl: form.imageUrl || null,
      homepage: form.homepage || null,
      graduationYear: form.graduationYear || null,
      currentPosition: form.currentPosition || null,
      sortOrder: form.sortOrder,
    };

    if (editingId) {
      await updateMember.mutateAsync({ id: editingId, data });
    } else {
      await createMember.mutateAsync(data);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMember.mutateAsync({ id: deleteId });
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const filteredMembers = members.data?.filter(
    (m) => filterCategory === "all" || m.category === filterCategory
  ) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy">구성원 관리</h1>
          <p className="text-muted-foreground text-sm mt-1">교수, 대학원생, 학부연구생, 졸업생 정보를 관리합니다.</p>
        </div>
        <Button onClick={openCreate} className="bg-signal-red hover:bg-signal-red/90 text-white font-heading">
          <Plus size={16} className="mr-2" />
          구성원 추가
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "professor", "graduate", "undergraduate", "alumni"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-xs font-heading font-medium rounded-md transition-colors ${
              filterCategory === cat
                ? "bg-navy text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat === "all" ? "전체" : categoryLabels[cat as MemberCategory]}
          </button>
        ))}
      </div>

      {/* Members list */}
      {members.isLoading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <User size={32} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">등록된 구성원이 없습니다.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4 font-heading text-xs">
            <Plus size={14} className="mr-1" />
            첫 구성원 추가하기
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMembers.map((member) => {
            const Icon = categoryIcons[member.category as MemberCategory] || User;
            return (
              <div
                key={member.id}
                className="flex items-center gap-4 bg-white border border-border rounded-lg p-4 hover:border-signal-red/20 transition-colors"
              >
                <div className="w-10 h-10 bg-navy/[0.04] rounded-md flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-navy/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-navy text-sm">{member.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded font-mono text-muted-foreground">
                      {categoryLabels[member.category as MemberCategory]}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5">{member.role}</p>
                  {member.research && (
                    <p className="text-muted-foreground text-xs mt-0.5 truncate">{member.research}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(member)}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    title="수정"
                  >
                    <Pencil size={14} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => { setDeleteId(member.id); setDeleteDialogOpen(true); }}
                    className="p-2 hover:bg-red-50 rounded-md transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingId ? "구성원 수정" : "구성원 추가"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">이름 *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">영문 이름</label>
                <Input
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  placeholder="Gildong Hong"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">분류 *</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as MemberCategory })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">교수</SelectItem>
                    <SelectItem value="graduate">대학원생</SelectItem>
                    <SelectItem value="undergraduate">학부연구생</SelectItem>
                    <SelectItem value="alumni">졸업생</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">역할 *</label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="석사과정 / 교수 등"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">연구 분야</label>
              <Textarea
                value={form.research}
                onChange={(e) => setForm({ ...form, research: e.target.value })}
                placeholder="운영체제, 컴파일러 최적화 등"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">이메일</label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@hnu.kr"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">홈페이지</label>
                <Input
                  value={form.homepage}
                  onChange={(e) => setForm({ ...form, homepage: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">프로필 이미지 URL</label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            {form.category === "alumni" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">졸업 연도</label>
                  <Input
                    value={form.graduationYear}
                    onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">현재 직위</label>
                  <Input
                    value={form.currentPosition}
                    onChange={(e) => setForm({ ...form, currentPosition: e.target.value })}
                    placeholder="기업 연구원 등"
                  />
                </div>
              </div>
            )}
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
              disabled={createMember.isPending || updateMember.isPending}
            >
              {createMember.isPending || updateMember.isPending ? "저장 중..." : editingId ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>구성원 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 이 구성원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
