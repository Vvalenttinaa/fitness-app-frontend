import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MessageComponent } from '../../features/messages/components/message/message.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MessageComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private dialog = inject(MatDialog);

  constructor(private router:Router){}
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

  openMessages(){
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '50%',
      disableClose: false,
      data: {
        animal: 'panda',
      },
    });
  }


}
