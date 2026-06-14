// ==================== Teacher Types ====================
export interface Teacher {
  id: string;
  fullName: string;
  branch: string;
  isAttending: boolean;
  isClassTeacher: boolean;
}

// ==================== Meeting Types ====================
export type GradeLevel = 9 | 10 | 11 | 12;

export type AchievementLevelId =
  | 'veryHigh'
  | 'high'
  | 'medium'
  | 'needsSupport'
  | 'low'
  | 'mixed';

export interface MeetingInfo {
  schoolName: string;
  academicYear: string;
  term: string;
  date: string;
  time: string;
  location: string;
  className: string;
  gradeLevel: GradeLevel;
  classAchievementLevel: AchievementLevelId;
  chairpersonId: string;
  clerkId: string;
}

// ==================== Agenda Types ====================
export type SpeakerCountMode = 'two' | 'three' | 'four' | 'random';

export interface AgendaItem {
  id: string;
  title: string;
  enabled: boolean;
  speakerCountMode: SpeakerCountMode;
}

// ==================== Generation Settings ====================
export type ToneType = 'official' | 'balanced' | 'detailed';
export type SpeechLengthType = 'short' | 'medium' | 'long';

export interface GenerationSettings {
  variationMode: 'random' | 'manual';
  variationId: number;
  tone: ToneType;
  speechLength: SpeechLengthType;
}

// ==================== Minutes Types ====================
export interface TeacherSpeech {
  teacherId: string;
  teacherName: string;
  branch: string;
  content: string;
}

export interface AgendaMinutes {
  agendaId: string;
  agendaTitle: string;
  agendaNumber: number;
  speeches: TeacherSpeech[];
  decisions: string[];
}

export interface GeneratedMinutes {
  id: string;
  title: string;
  meetingInfo: MeetingInfo;
  attendingTeachers: Teacher[];
  absentTeachers: Teacher[];
  agendaMinutes: AgendaMinutes[];
  closingText: string;
  generatedAt: string;
  variationId: number;
}

// ==================== Archive Types ====================
export interface ArchivedMinutes {
  id: string;
  schoolName: string;
  className: string;
  gradeLevel: GradeLevel;
  achievementLevel: AchievementLevelId;
  meetingDate: string;
  createdAt: string;
  minutesData: GeneratedMinutes;
}

// ==================== Data Structure Types ====================
export interface GradeVariation {
  id: number;
  title: string;
  focus: string;
  keywords: string[];
  agendaHints: Record<string, string[]>;
  speechTemplates: Record<string, string[]>;
  decisionTemplates: string[];
}

export interface GradeProfile {
  level: GradeLevel;
  label: string;
  variations: GradeVariation[];
}

export interface AchievementLevelVersion {
  versionId: number;
  positiveEmphasis: string[];
  commonIssues: string[];
  decisionHints: string[];
  speechModifiers: string[];
}

export interface AchievementLevel {
  id: AchievementLevelId;
  label: string;
  description: string;
  academicTone: string;
  versions: AchievementLevelVersion[];
}

export interface BranchSpeechStyle {
  branch: string;
  focusAreas: string[];
  sentenceStarters: string[];
  suggestions: string[];
  agendaRelevance: Record<string, number>;
}

// ==================== Toast Types ====================
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
