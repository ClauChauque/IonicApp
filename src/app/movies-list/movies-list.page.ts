import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
})
export class MoviesListPage implements OnInit {

  movies!:any[]
  page:number=1;

  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

  createTemplate(url:string){
    const template=`https://image.tmdb.org/t/p/w500/${url}`
    return template
  }
  nextPage(){
    this.page++;
    console.log(this.page);
    this.router.navigate(['movies-list']);
  }
  backPage(){
    this.page--;
    console.log(this.page);
    this.router.navigate(['/movies-list']);
  }
  ngOnInit() {
    this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=373d3d64f286e9fc62879bb68579a452&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${String(this.page)}&with_watch_monetization_types=flatrate`)
    .subscribe(res=>{
      console.log(res);
      this.movies=res.results;
    })
  }

}
