import { App } from 'vue'

import {
    Alert,
    Avatar,
    Badge,
    Button,
    Checkbox,
    Col,
    Dropdown,
    Form,
    Image,
    Input,
    InputNumber,
    Layout,
    LayoutSider,
    List,
    Menu,
    Modal,
    Radio,
    Row,
    Select,
    SelectOption,
    Slider,
    Spin,
    Switch,
    Table,
    Tabs,
    Tooltip,
    Drawer
} from 'ant-design-vue';

export default function useAntUi(app: App) {
    app.use(Row)
        .use(Col)
        .use(Tooltip)
        .use(Image)
        .use(Badge)
        .use(List)
        .use(Alert)
        .use(Button)
        .use(Form)
        .use(Input)
        .use(Checkbox)
        .use(Dropdown)
        .use(Avatar)
        .use(Menu)
        .use(Spin)
        .use(Layout)
        .use(LayoutSider)
        .use(Modal)
        .use(Switch)
        .use(Select)
        .use(SelectOption)
        .use(InputNumber)
        .use(Radio)
        .use(Slider)
        .use(Table)
        .use(Tabs)
        .use(Drawer)
    return app
}
