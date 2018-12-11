<dx-popup [(visible)]="territoryPopup" [position]="{ my: 'right top', at: 'right top', of: window }" [width]="600"
    [height]="'100vh'" [showTitle]="false" [dragEnabled]="false" [closeOnOutsideClick]="false" [showCloseButton]="true"
    shadingColor="rgba(0,0,0,0.5)">
    <div *dxTemplate="let data of 'content'">
        <div fxLayout="column" style="height: calc(100% - 50px);">
            <div class="popup-title">
                <span *ngIf="!selectedTerritory.id">New Territory</span>
                <span *ngIf="selectedTerritory.id">Edit Territory</span>
            </div>
            <div class="vertical-padding">
                <span fxFlex>Name</span>
                <dx-text-box fxFlex [(value)]="selectedTerritory.name" placeholder="Territory Name"></dx-text-box>
            </div>
            <div class="vertical-padding">
                <span fxFlex>Type</span>
                <dx-select-box fxFlex [dataSource]="territoryTypes" placeholder="Choose type" displayExpr="name"
                    valueExpr="id" [value]="checkTerritoryType()" [searchEnabled]="true" (onSelectionChanged)="typeValueChanged($event)"></dx-select-box>
            </div>
            <div class="vertical-padding">
                <span fxFlex>Parent Territory</span>
                <dx-select-box fxFlex [dataSource]="allTerritories" placeholder="Choose territory" [(value)]="selectedTerritory.parentId"
                    valueExpr="id" displayExpr="name" [searchEnabled]="true"></dx-select-box>
            </div>
        </div>
        <div fxLayout="row" fxLayoutAlign="end end">
            <div fxFlex fxLayoutAlign="end end">
                <span class="button button-white" (click)="cancelTerritory()">Cancel</span>
                <span class="button button-blue" (click)="saveTerritory()">Save</span>
            </div>
        </div>
    </div>
</dx-popup>

selectedTerritory: TerritoryV2;

 saveTerritory(): void {
        if (this.selectedTerritory.id) {
            this._territoryService.updateTerritory(this.selectedTerritory).then(result => {
                this.selectedTerritory = Object.assign({}, result);
                this.allTerritories.filter((territory: TerritoryV2) => {
                    if (territory.id == this.selectedTerritory.id) {
                        territory = this.selectedTerritory;
                    }
                });
                if (this.addRepPopup == true) {
                    this.addRepPopup = false;
                } else {
                    this.territoryPopup = false;
                }
                for (let i = 0; i < this.allTerritories.length; i++) {
                    if (this.allTerritories[i].id == this.selectedTerritory.id) {
                        this.allTerritories[i] = JSON.parse(JSON.stringify(this.selectedTerritory));
                    }
                }
                this.territoriesList.instance.refresh();
            });
        } else {
            this._territoryService.addTerritory(this.selectedTerritory).then((result) => {
                this.selectedTerritory = Object.assign({}, result);
                this.allTerritories.push(this.selectedTerritory);
                this.allTerritories.sort((a: TerritoryV2, b: TerritoryV2) => a.name.localeCompare(b.name));
                this.territoryPopup = false;
                this.territoriesList.instance.refresh();
            });
        }
    }

     selectTerritory(e: any): void {
        if (e.rowType == 'data' && e.column.caption != "") {
            this._companyService.getCompaniesByTerritoryId(e.data.id).then((result: any) => {
                this.companies = result;
                this.selectedTerritory = Object.assign({}, e.data);
                if (this.selectedTerritory.users) {
                    this.selectedTerritory.users = this.selectedTerritory.users.filter((user: UserV2) => !user.deleted);
                    this.selectedTerritory.users.sort((a: UserV2, b: UserV2) => a.firstName.localeCompare(b.firstName));
                } else {
                    this.selectedTerritory.users = [];
                }
                this.selectedTerritoryCopy = JSON.parse(JSON.stringify(this.selectedTerritory));
                this.editTerritoryPopup = true;
            });
        }
    }

        newTerritory(): void {
        this.selectedTerritory = Object.assign({});
        this.selectedTerritoryCopy = Object.assign({});
        this.territoryPopup = true;
    }
