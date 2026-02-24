export interface Prayer {
  id: number;
  categoryId: number;
  userId: number;
  title: string;
  description: string;
  isAnswered: boolean;
  dateCreated: string;
  dateAnswered: string | null;
  notes: string | null;
}