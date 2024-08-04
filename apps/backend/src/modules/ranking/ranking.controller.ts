import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { GetRankingDto } from './dto/ranking.dto';
import { RankingEntity } from './entities/ranking.entity';
import { RankingResult, RankingService } from './ranking.service';

@Controller('/api/ranking')
export class RankingController {
  constructor(private readonly rankingsService: RankingService) {}

  @Post('get-by-count')
  @HttpCode(HttpStatus.OK)
  async getRankingByCount(@Body() dto: GetRankingDto): Promise<RankingEntity[]> {
    const rankingResult = await this.rankingsService.getRanking(dto);
    rankingResult.sort((a, b) => b.count - a.count);

    const rankingEntities: RankingEntity[] = rankingResult.map((ranking, index) => {
      return {
        rikoImage: ranking.rikoImage,
        rank: index + 1,
        rankValue: ranking.count,
      };
    });

    return rankingEntities.map(ranking => new RankingEntity(ranking));
  }

  @Post('get-by-duration')
  @HttpCode(HttpStatus.OK)
  async getRankingByDuration(@Body() dto: GetRankingDto): Promise<RankingEntity[]> {
    const rankingResult: RankingResult[] = await this.rankingsService.getRanking(dto);
    rankingResult.sort((a, b) => b.duration - a.duration);

    const rankingEntities: RankingEntity[] = rankingResult.map((ranking, index) => {
      return {
        rikoImage: ranking.rikoImage,
        rank: index + 1,
        rankValue: ranking.duration,
      };
    });

    return rankingEntities.map(ranking => new RankingEntity(ranking));
  }
}
