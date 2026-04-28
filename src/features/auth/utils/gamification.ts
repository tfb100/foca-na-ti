export const XP_PER_SUMMARY = 100;
export const XP_PER_LEVEL = 500;

export function calculateLevel(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getXPProgress(xp: number) {
  const currentLevel = calculateLevel(xp);
  const xpInCurrentLevel = xp % XP_PER_LEVEL;
  const progress = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  
  return {
    currentLevel,
    xpInCurrentLevel,
    xpForNextLevel: XP_PER_LEVEL,
    progress
  };
}

export function calculateStreak(lastStudyDate: Date | null, currentStreak: number): number {
  if (!lastStudyDate) return 1;

  const now = new Date();
  const last = new Date(lastStudyDate);
  
  // Zerar horas para comparar apenas dias
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());

  if (lastDay.getTime() === today.getTime()) {
    return currentStreak; // Já estudou hoje
  }

  if (lastDay.getTime() === yesterday.getTime()) {
    return currentStreak + 1; // Continuidade
  }

  return 1; // Quebrou a sequência
}
