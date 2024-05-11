import { Component, Input, OnInit, inject } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import Comment from '../../model/comment.model';
import { MatList } from '@angular/material/list';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import CommentRequest from '../../model/responses/comment-request.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import ReplyRequest from '../../model/reply-request.model';
import Reply from '../../model/reply.model';

@Component({
  selector: 'app-comments-component',
  templateUrl: './comments.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatList,
    MatLabel,
    MatFormField,
    MatIcon,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() fitnessProgramId: number | undefined;
  @Input() userId: number | undefined;

  comments: Comment[] = [];
  comment = new FormControl('');
  programService = inject(ProgramService);

  showReplyInput: { [key: number]: boolean } = {};
  replyText: { [key: number]: string } = {};

  ngOnInit(){
    if (this.fitnessProgramId !== undefined) {
      this.programService.getAllComments(this.fitnessProgramId).subscribe({
        next: (comments: Comment[]) => {
          this.comments = comments;
          console.log(comments);
        },
        error: (error) => {
          console.error('Error fetching comments:', error);
        }
      });
    }
  }

  addComment() {
    let content = this.comment.value;
    let comment: CommentRequest = {
      content: content,
      userId: 1,
      programId: this.fitnessProgramId,
    };
    if (comment.programId !== undefined) {
      this.programService.postComment(comment.programId, comment).subscribe({
        next: (comment: Comment) => {
          console.log(comment);
          this.reload();
          this.comment.reset();
        },
        error: (error: any) => {
          console.log('Error posting comment...');
        },
      });
    }
  }

  toggleReplyInput(commentId: number) {
    this.showReplyInput[commentId] = !this.showReplyInput[commentId];
  }
  
  // Function to submit reply
  submitReply(commentId: number) {
    const replyText = this.replyText[commentId];
    let reply: ReplyRequest = {
      content: replyText,
      userId: 1,
      commentId: commentId
    };
    this.programService.submitReply(commentId, reply).subscribe({
      next: (replyRes: Reply) => {
        console.log('Reply submitted:', replyRes);
        this.replyText[commentId]='';
        this.reload();
      },
      error: (error:any) => {
        console.error('Error submitting reply:', error);
      }
    }
    );
  }

  reload(){
    if (this.fitnessProgramId !== undefined) {
      this.programService.getAllComments(this.fitnessProgramId).subscribe({
        next: (comments: Comment[]) => {
          this.comments = comments;
          console.log(comments);
        },
        error: (error) => {
          console.error('Error fetching comments:', error);
        }
      });
    }
  }
}
