//loader.interceptor.ts
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  loading: boolean;
  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading.subscribe((status) => {
      this.loading = status;
    });
  }
  ngOnInit() {
  }

}