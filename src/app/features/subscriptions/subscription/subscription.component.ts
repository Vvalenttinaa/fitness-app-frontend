import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Category from '../../../model/category.model';
import { map, tap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubscriptionService } from '../../../services/subscription.service';
import Subscription from '../../../model/subscription.model';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  categoryService = inject(CategoryService);
  subscriptionService = inject(SubscriptionService);

  categories: Category[] = [];
  subscriptions: Subscription[] =[];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (res: Category[]) => {
        this.categories=res;
      }
    });

    this.fetchSubscriptions();

  }

  fetchSubscriptions(){
    this.subscriptionService.getAll(1).subscribe({
      next: (res: Subscription[]) => {
        this.subscriptions = res;
        console.log(this.subscriptions);
      }
    });
  }

  isSubscribed(categoryId: number): boolean {
    return this.subscriptions.some(subscription => subscription.categoryId === categoryId);
  }

  onChecked(categoryId: number, event: any): void {
    if (event.checked) {
      this.subscriptionService.addSubscription(1,categoryId).subscribe();
      this.fetchSubscriptions();
    } 
  }
}
