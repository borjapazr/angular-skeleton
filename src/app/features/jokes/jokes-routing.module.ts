import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChuckNorrisComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'chuck-norris', pathMatch: 'full' },
  { path: 'chuck-norris', component: ChuckNorrisComponent, data: { shouldReuse: true, revalidate: 5 } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JokesRoutingModule {}
