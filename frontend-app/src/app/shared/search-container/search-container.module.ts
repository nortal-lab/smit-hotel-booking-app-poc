import { NgModule } from '@angular/core';
import { SearchContainerComponent } from './search-container.component';
import { UiModule } from '@egov/cvi-ng';
import { AppUiModule } from 'src/app/app-ui/app-ui.module';

@NgModule({
  declarations: [SearchContainerComponent],
  exports: [SearchContainerComponent],
  providers: [],
  imports: [UiModule, AppUiModule],
})
export class SearchContainerModule {}
