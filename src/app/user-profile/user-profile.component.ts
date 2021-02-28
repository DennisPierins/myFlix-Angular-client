import { Component, OnInit, Input } from '@angular/core';
import { GetUserService, GetFavouriteMoviesService, DeleteFavouriteMovieService, DeleteUserService, GetAllMoviesService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: DeleteUserService,
    public fetchApiData3: GetFavouriteMoviesService,
    public fetchApiData4: DeleteFavouriteMovieService,
    public fetchApiData5: GetAllMoviesService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData = resp;
    });
  }

  openUpdateUserProfileDialog(): void {
    this.dialog.open(UpdateUserProfileComponent, {
      width: '280px',
    });
  }

  openDeleteUserProfileDialog(): void {
    let ok = confirm("Deleting this profile can not be undone. Are you sure?");
    if (ok) {
      this.fetchApiData2.deleteUser().subscribe(() => {
        console.log('Profile deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile has been removed', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.router.navigate(['welcome']);
    }
  }
}
