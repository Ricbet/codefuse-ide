import { Autowired } from '@opensumi/di'
import { Domain, MaybePromise } from '@opensumi/ide-core-common'
import { ClientAppContribution, IClientApp } from '@opensumi/ide-core-browser'
import { IMenuRegistry, MenuId, MenuContribution } from "@opensumi/ide-core-browser/lib/menu/next";
import { localize } from "@opensumi/ide-core-common/lib/localize";
import { IWorkspaceService } from '@opensumi/ide-workspace';
import { IAppMenuService } from '../common';

@Domain(ClientAppContribution, MenuContribution)
export class LocalMenuContribution implements MenuContribution, ClientAppContribution {
  @Autowired(IWorkspaceService)
  workspaceService: IWorkspaceService;

  @Autowired(IAppMenuService)
  menuService: IAppMenuService;

  initialize(): MaybePromise<void> {
    // this.renderAppMenu();
  }

  async renderAppMenu() {
    const workspaces = await this.workspaceService.getMostRecentlyUsedWorkspaces();
    await this.menuService.renderRecentWorkspaces(workspaces);
  }

  registerMenus(menuRegistry: IMenuRegistry) {
    menuRegistry.registerMenuItem(MenuId.MenubarAppMenu, {
      submenu: MenuId.SettingsIconMenu,
      label: localize('common.preferences'),
      group: '2_preference',
    });
  }
}
