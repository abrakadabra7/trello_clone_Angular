import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

@Component({
  selector: 'app-projects-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `<div class="projects-dialog">
    <h2 mat-dialog-title>Projelerim</h2>
    <mat-dialog-content>
      <div class="projects-list">
        <div *ngFor="let project of projects" class="project-item">
          <div class="project-info" (click)="selectProject(project)">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description || 'Açıklama yok' }}</p>
            <small>{{ project.created_at | date:'dd/MM/yyyy HH:mm' }}</small>
          </div>
          <div class="project-actions">
            <button class="delete-btn" (click)="deleteProject(project.id, $event)">
              <mat-icon>delete</mat-icon>
            </button>
            <mat-icon class="arrow-icon">chevron_right</mat-icon>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Kapat</button>
    </mat-dialog-actions>
  </div>`,
  styleUrls: ['./projects-dialog.component.css']
})
export class ProjectsDialogComponent implements OnInit {
  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );
  
  projects: Project[] = [];

  constructor(private dialogRef: MatDialogRef<ProjectsDialogComponent>) {}

  async ngOnInit() {
    await this.loadProjects();
  }

  async loadProjects() {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      this.projects = data || [];
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
    }
  }

  selectProject(project: Project) {
    this.dialogRef.close(project);
  }

  async deleteProject(projectId: string, event: MouseEvent) {
    event.stopPropagation();

    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await this.supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      this.projects = this.projects.filter(p => p.id !== projectId);
    } catch (error) {
      console.error('Proje silinirken hata:', error);
    }
  }
} 