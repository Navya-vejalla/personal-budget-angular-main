import { Component, OnInit, input } from '@angular/core';
import { title } from 'process';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'pb-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})

export class ArticleComponent implements OnInit {


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
