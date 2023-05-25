import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movieID!:any;
  film!:any;
  constructor(
    private activateRoute:ActivatedRoute,
    private http: HttpClient,
    ) { }  

  ngOnInit() {
    this.movieID= this.activateRoute.snapshot.paramMap.get('id');
    this.http.get('https://api.themoviedb.org/3/movie/' + this.movieID + '?api_key=373d3d64f286e9fc62879bb68579a452&language=es-ES')
    .subscribe(res=>{
      console.log(res);
      this.film=res
    })
  }

  createTemplate(url:string){
    const template=`https://image.tmdb.org/t/p/w500/${url}`
    return template
  }
}
