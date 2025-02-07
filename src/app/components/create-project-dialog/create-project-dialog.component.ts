import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="dialog-container">
      <h2>Yeni Proje Oluştur</h2>
      <form #projectForm="ngForm">
        <mat-form-field appearance="outline">
          <mat-label>Proje Başlığı</mat-label>
          <input 
            matInput 
            [(ngModel)]="title" 
            name="title" 
            required 
            #titleInput="ngModel"
            placeholder="Proje başlığını girin">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Açıklama</mat-label>
          <textarea 
            matInput 
            [(ngModel)]="description" 
            name="description"
            placeholder="Proje açıklamasını girin"
            rows="3">
          </textarea>
        </mat-form-field>

        <div class="dialog-actions">
          <button mat-button (click)="onCancel()">İptal</button>
          <button 
            mat-raised-button 
            color="primary" 
            [disabled]="!title.trim()"
            (click)="onSubmit()">
            Oluştur
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 20px;
      width: 100%;
      max-width: 500px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class CreateProjectDialogComponent {
  title: string = '';
  description: string = '';

  constructor(private dialogRef: MatDialogRef<CreateProjectDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.title?.trim()) {
      this.dialogRef.close({
        title: this.title.trim(),
        description: this.description?.trim()
      });
    }
  }
} 