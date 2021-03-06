// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavouriteMovieService, DeleteFavouriteMovieService } from '../fetch-api-data.service';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavouriteMovieService,
    public fetchApiData3: DeleteFavouriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * The getMovies function is run on initialization
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This retrieves a list of all the movies and stores them in an array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog containing details of the movie's director
   * @param name 
   * @param bio 
   * @param birth 
   */
  showDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth },
      width: '600px',
    });
  }

  /**
   * Opens a dialog containing details of the movie's genre
   * @param name 
   * @param description 
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '600px'
    });
  }

  /**
   * Opens a dialog containing details of the movie
   * @param title 
   * @param imagepath 
   * @param description 
   * @param director 
   * @param genre 
   */
  showMovieDetails(title: string, imagepath: string, description: string, director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagepath, description, director, genre },
      width: '600px'
    });
  }

  /**
   * Adds the movie to the user's list of favourite movies
   * @param id 
   * @param title 
   */
  addFavourite(id: string, title: string): void {
    this.fetchApiData2.addFavouriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favourites`, 'OK', {
        duration: 2000,
      });
    });
  }
}