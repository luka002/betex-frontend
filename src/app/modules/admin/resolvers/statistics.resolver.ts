import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {map} from 'rxjs/operators';
import {StatisticsService} from '../../core/services';
import {Statistics, VisitorCounter} from '../../core/models';

class StatisticsResolverData {
  statistics: Statistics;
  visitorCounter: VisitorCounter[];
}

@Injectable()
export class StatisticsResolver implements Resolve<StatisticsResolverData> {

  constructor(private statisticsService: StatisticsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StatisticsResolverData> | Promise<StatisticsResolverData> | StatisticsResolverData {
    const statistics = this.statisticsService.statistics.value;
    const visitorCounter = this.statisticsService.visitorCount.value;

    if (statistics === null || visitorCounter === null) {
      return zip(
        this.statisticsService.getStatistics(),
        this.statisticsService.getVisitorCounterLastDays(7)
      ).pipe(
        map(([stats, visitors]: [Statistics, VisitorCounter[]]) => {
          return {statistics: stats, visitorCounter: visitors} as StatisticsResolverData;
        })
      );
    } else {
      return {statistics: statistics, visitorCounter: visitorCounter} as StatisticsResolverData;
    }
  }

}
