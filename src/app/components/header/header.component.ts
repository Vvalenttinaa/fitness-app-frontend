import { Component, OnInit, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MessageComponent } from '../../features/messages/components/message/message.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MessageComponent,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    JsonPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  loggedIn: boolean = false;

  constructor(private router:Router){}
  ngOnInit(): void {
    this.authService.authStatus$.subscribe(status => {
      this.loggedIn = status;
    });
  }
  onPrograms()
  {
    this.router.navigate(['programs']);
  }
  onRegister()
  {
    this.router.navigate(['registration']);
  }
  onLogin()
  {
    this.router.navigate(['login']);
  }

  openSubscriptions()
  {
    this.router.navigate(['subscriptions']);
  }

  openMessages(){
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '50%',
      disableClose: false,
      data: {
        animal: 'panda',
      },
    });
  }

  openMyDiary(){
    this.router.navigate(['my-diary']);
  }

  openMyProfile(){
    this.router.navigate(['profile'])
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onNews(){
    this.router.navigate(['news']);
  }

  openSuggestions(){
    this.router.navigate(['suggestions']);
  }
}
