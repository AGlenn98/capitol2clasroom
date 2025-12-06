// Bill categories for filtering
export const BILL_CATEGORIES = [
  { id: 'all', label: 'All Bills', color: 'bg-secondary' },
  { id: 'k12-funding', label: 'K-12 Funding', color: 'bg-blue-500' },
  { id: 'k12-curriculum', label: 'Curriculum', color: 'bg-purple-500' },
  { id: 'teachers', label: 'Teachers', color: 'bg-green-500' },
  { id: 'higher-ed', label: 'Higher Education', color: 'bg-orange-500' },
  { id: 'special-ed', label: 'Special Education', color: 'bg-pink-500' },
  { id: 'school-safety', label: 'School Safety', color: 'bg-red-500' },
  { id: 'charter-choice', label: 'Charter/Choice', color: 'bg-yellow-500' },
  { id: 'early-childhood', label: 'Early Childhood', color: 'bg-teal-500' },
] as const;

export type BillCategoryId = typeof BILL_CATEGORIES[number]['id'];

// Keywords to auto-categorize bills
const categoryKeywords: Record<Exclude<BillCategoryId, 'all'>, string[]> = {
  'k12-funding': ['funding', 'budget', 'appropriation', 'BEP', 'TISA', 'finance', 'tax', 'revenue'],
  'k12-curriculum': ['curriculum', 'instruction', 'standards', 'textbook', 'reading', 'literacy', 'math'],
  'teachers': ['teacher', 'educator', 'licensure', 'certification', 'salary', 'compensation', 'tenure', 'professional'],
  'higher-ed': ['university', 'college', 'higher education', 'HOPE', 'Promise', 'tuition', 'degree'],
  'special-ed': ['special education', 'disability', 'IEP', 'IDEA', 'accommodation', 'intervention'],
  'school-safety': ['safety', 'security', 'discipline', 'resource officer', 'violence', 'bullying', 'harassment'],
  'charter-choice': ['charter', 'voucher', 'ESA', 'choice', 'private school', 'scholarship'],
  'early-childhood': ['pre-k', 'prekindergarten', 'early childhood', 'childcare', 'preschool', 'voluntary pre-k'],
};

export function categorizeBill(title: string, description?: string): BillCategoryId {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category as BillCategoryId;
      }
    }
  }
  
  return 'k12-curriculum'; // Default for education bills
}

export function getCategoryInfo(categoryId: BillCategoryId) {
  return BILL_CATEGORIES.find(c => c.id === categoryId) || BILL_CATEGORIES[0];
}

// Impact direction type
export type ImpactDirection = 'up' | 'down' | 'neutral';

export interface ImpactRating {
  direction: ImpactDirection;
  score: number; // 1-5
}

export interface BillImpact {
  funding: ImpactRating;
  teachers: ImpactRating;
  parents: ImpactRating;
  students: ImpactRating;
}

export interface StakeholderPosition {
  group: string;
  argument: string;
}

export interface StakeholderAnalysis {
  support: StakeholderPosition[];
  oppose: StakeholderPosition[];
}
