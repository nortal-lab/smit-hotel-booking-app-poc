import { NgModule } from '@angular/core';
import { SearchContainerComponent } from './search-container.component';
import { UiModule } from '@egov/cvi-ng';

@NgModule({
  declarations: [SearchContainerComponent],
  exports: [SearchContainerComponent],
  providers: [],
  imports: [UiModule],
})
export class SearchContainerModule {}
