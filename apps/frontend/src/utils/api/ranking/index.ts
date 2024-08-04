import type { GetRankingDto, RankingEntityResponse } from '@repo/db';

export async function getRankingByCountApi(body: GetRankingDto) {
  return $fetch<RankingEntityResponse[]>('/api/ranking/get-by-count', { body, method: 'POST' })
    .catch((error) => {
      handleApiError(error, 'getRankingByCountApi');
      throw error;
    });
}
export async function getRankingByDurationApi(body: GetRankingDto) {
  return $fetch<RankingEntityResponse[]>('/api/ranking/get-by-duration', { body, method: 'POST' })
    .catch((error) => {
      handleApiError(error, 'getRankingByDurationApi');
      throw error;
    });
}
