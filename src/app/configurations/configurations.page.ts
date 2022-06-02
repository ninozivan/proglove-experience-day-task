import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit {
  public listOfConfigurations: any = [1, 2, 3, 4, 5];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  public onCreate(): void {
    this.router.navigate(['./create'], { relativeTo: this.activatedRoute });
  }

  public onEdit(): void {
    this.router.navigate([`./edit/555`], {
      relativeTo: this.activatedRoute,
    });
  }
}
