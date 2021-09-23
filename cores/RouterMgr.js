/*****************************
 * @providesModule RouterMgr *
 * @created_by Kds           *
 *****************************/

export default class RouterMgr {

    static instance = null;
    static createInstance() { const object = new RouterMgr(); return object; };
    static getInstance() {
        if (!RouterMgr.instance) { RouterMgr.instance = RouterMgr.createInstance(); }
        return RouterMgr.instance;
    }

    footprints = {
        index_1: '', // current page;
        index_2: '', // recent page;
        index_3: '', // previous page;
    };

    setCurrentRouter(page, param) {
        let temp = this.footprints;
        this.footprints = {
            index_1: page,
            index_1_param: param,
            index_2: temp.index_1,
            index_2_param: temp.index_1_param,
            index_3: temp.index_2,
            index_3_param: temp.index_2_param,
        };
    }

    getRouterPage(index, all) {
        if (index) {
            if (all) {
                return {
                    route: this.footprints[`index_${index}`],
                    param: this.footprints[`index_${index}_param`],
                };
            } else {
                return this.footprints[`index_${index}`];
            }
        } else {
            return this.footprints;
        }
    }

}