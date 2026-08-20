// Server-side "controller" for the editorial-board profile page.
// Loads the member + a small set of "other board members" so the view
// stays pure and swappable.

import {
  getBoardMemberBySlug,
  getBoardMembers,
} from "@/app/lib/services/journal.service";
import type { Editor } from "@/app/utils/types/journal.type";

export interface ProfileViewData {
  member: Editor;
  otherMembers: Editor[];
}

export async function loadProfile(
  slug: string,
): Promise<ProfileViewData | null> {
  const [{ data: member }, { data: allMembers }] = await Promise.all([
    getBoardMemberBySlug(slug),
    getBoardMembers(),
  ]);
  if (!member) return null;

  const otherMembers = allMembers
    .filter(
      (m) => m.id !== member.id && m.boardGroup === member.boardGroup,
    )
    .slice(0, 3);

  return { member, otherMembers };
}

/**
 * Excerpt of the bio suitable for a meta description (≤160 chars, on a
 * word boundary). Skips period-terminated honorifics and initials so we
 * don't return a truncated "Dr." — always yields a non-empty, human
 * readable string when the bio itself is non-empty.
 */
export function firstSentence(text: string, maxLen = 160): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (trimmed.length <= maxLen) return trimmed;
  const truncated = trimmed.slice(0, maxLen - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 40 ? truncated.slice(0, lastSpace) : truncated) + "…";
}
