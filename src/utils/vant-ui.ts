import { App } from 'vue'
import { Button, ConfigProvider, Dialog, Tabbar, TabbarItem, Toast } from 'vant';
import { Step, Steps, Popup, Tab, Tabs, Col, Row, Sticky, List, Empty, PullRefresh } from 'vant';
import { CellGroup, Field, Grid, GridItem, RadioGroup, Radio, Checkbox, CheckboxGroup, Skeleton } from 'vant';
import { Image, Icon } from 'vant';
import { Picker, Uploader, NoticeBar, Stepper } from 'vant';
import { Collapse, CollapseItem, Swipe, SwipeItem } from 'vant';

export default function useVantUi(app: App) {
    app.use(Button)
        .use(Tabbar)
        .use(TabbarItem)
        .use(ConfigProvider)
        .use(Collapse)
        .use(CollapseItem)
        .use(Toast)
        .use(Dialog)
        .use(Step)
        .use(Steps)
        .use(SwipeItem)
        .use(Swipe)
        .use(Popup)
        .use(NoticeBar)
        .use(Tab)
        .use(Col)
        .use(Row)
        .use(Tabs)
        .use(Sticky)
        .use(Picker)
        .use(Grid)
        .use(GridItem)
        .use(Empty)
        .use(Uploader)
        .use(PullRefresh)
        .use(Radio)
        .use(RadioGroup)
        .use(Checkbox)
        .use(CheckboxGroup)
        .use(List)
        .use(CellGroup)
        .use(Image)
        .use(Field)
        .use(Icon)
        .use(Skeleton)
        .use(Stepper)
    return app
}
