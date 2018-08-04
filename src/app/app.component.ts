import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

const CACHE_KEY = 'httpRepoCache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public repos;

  constructor(private http: HttpClient) {
    const path = 'https://api.github.com/search/repositories?q=angular';
    this.repos = http.get<any>(path)
      .pipe(pluck('items'));

    this.repos.subscribe(next => {
      localStorage[CACHE_KEY] = JSON.stringify(next);
    });
  }
}
