/**
 * Education Bill Filter
 * Filters bills to only include those related to K-12, higher education,
 * or vocational education training
 */

// Keywords that MUST be present for K-12 education bills
const K12_KEYWORDS = [
  'school',
  'schools',
  'k-12',
  'k12',
  'elementary',
  'middle school',
  'high school',
  'public school',
  'private school',
  'charter school',
  'mnps',
  'metro nashville public schools',
  'student',
  'students',
  'teacher',
  'teachers',
  'educator',
  'classroom',
  'curriculum',
  'instruction',
  'textbook',
  'grade',
  'grades',
  'pupil',
  'bep', // Basic Education Program
  'tisa', // Tennessee Investment in Student Achievement
  'special education',
  'sped',
  'iep', // Individualized Education Program
  'pre-k',
  'prekindergarten',
  'preschool',
  'kindergarten',
  'literacy',
  'reading',
  'voucher',
  'esa', // Education Savings Account
  'school choice',
  'school board',
  'board of education',
  'superintendent',
  'principal',
  'counselor',
  'school safety',
  'bullying',
  'truancy',
  'attendance',
  'graduation',
  'diploma',
  'testing',
  'assessment',
  'standardized test',
];

// Keywords for higher education bills
const HIGHER_ED_KEYWORDS = [
  'university',
  'universities',
  'college',
  'colleges',
  'higher education',
  'postsecondary',
  'post-secondary',
  'community college',
  'technical college',
  'tennessee promise',
  'tn promise',
  'hope scholarship',
  'lottery scholarship',
  'tuition',
  'financial aid',
  'student loan',
  'fafsa',
  'campus',
  'faculty',
  'professor',
  'undergraduate',
  'graduate',
  'degree',
  'bachelor',
  'associate',
  'masters',
  'doctoral',
  'phd',
  'enrollment',
  'admissions',
  'tcat', // Tennessee College of Applied Technology
];

// Keywords for vocational/career and technical education
const VOCATIONAL_KEYWORDS = [
  'vocational',
  'technical education',
  'career and technical',
  'cte',
  'apprenticeship',
  'workforce development',
  'job training',
  'skills training',
  'trade school',
  'certification program',
  'career pathway',
  'work-based learning',
  'dual enrollment',
  'industry credential',
];

// Keywords that indicate NON-education bills (exclude these)
const EXCLUDE_KEYWORDS = [
  'prison education', // Criminal justice
  'inmate education',
  'correctional education',
  'patient education', // Healthcare
  'health education program', // Unless specifically about school health
  'driver education', // Unless part of school curriculum
  'hunters education',
  'boating education',
  'alcohol education', // Unless school-related
  'tobacco education',
  'continuing legal education',
  'continuing medical education',
  'professional continuing education',
  'license renewal education',
];

// Exception patterns - if these appear WITH exclude keywords, the bill might still be valid
const EXCEPTION_PATTERNS = [
  'school-based',
  'school health',
  'public school',
  'in schools',
  'school curriculum',
  'school program',
];

/**
 * Check if a bill is truly education-related
 */
export function isEducationBill(title: string, description?: string): boolean {
  const text = `${title} ${description || ''}`.toLowerCase();

  // First, check for exclude keywords
  const hasExcludeKeyword = EXCLUDE_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  // If exclude keyword found, check for exception patterns
  if (hasExcludeKeyword) {
    const hasException = EXCEPTION_PATTERNS.some(pattern =>
      text.includes(pattern.toLowerCase())
    );
    if (!hasException) {
      return false; // Exclude this bill
    }
  }

  // Check if any K-12 keywords are present
  const hasK12Keyword = K12_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  // Check if any higher ed keywords are present
  const hasHigherEdKeyword = HIGHER_ED_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  // Check if any vocational keywords are present
  const hasVocationalKeyword = VOCATIONAL_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  // Bill is valid if it matches at least one category
  return hasK12Keyword || hasHigherEdKeyword || hasVocationalKeyword;
}

/**
 * Determine the specific education category of a bill
 */
export function getEducationType(title: string, description?: string): 'k12' | 'higher-ed' | 'vocational' | 'mixed' {
  const text = `${title} ${description || ''}`.toLowerCase();

  const hasK12 = K12_KEYWORDS.some(k => text.includes(k.toLowerCase()));
  const hasHigherEd = HIGHER_ED_KEYWORDS.some(k => text.includes(k.toLowerCase()));
  const hasVocational = VOCATIONAL_KEYWORDS.some(k => text.includes(k.toLowerCase()));

  const matches = [hasK12, hasHigherEd, hasVocational].filter(Boolean).length;

  if (matches > 1) return 'mixed';
  if (hasK12) return 'k12';
  if (hasHigherEd) return 'higher-ed';
  if (hasVocational) return 'vocational';

  return 'k12'; // Default
}

/**
 * Filter an array of bills to only include education-related ones
 */
export function filterEducationBills<T extends { title: string; last_action?: string }>(
  bills: T[]
): T[] {
  return bills.filter(bill => isEducationBill(bill.title, bill.last_action));
}
