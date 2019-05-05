import {
  version,
  locale,
  i18n,
  install,
  CollapseTransition,
  Loading,
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Notification,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Message,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer
} from 'element-ui'

/*
* Input组件含输入文字数扩展
*/
Input.props.numberWord = {
  type: Boolean,
  default: false
}

Input.props.maxlength = {
  type: Number,
  default: 200
}

if (Input.updated && !Input.beforeMount) {
  Input.beforeMount = function () {
    if (this.numberWord) {
      this.$nextTick(function () {
        if (this.maxlength) {
          let node = document.createElement('div')
          node.className = 'el-input-word-counter'
          node.innerHTML = this.value.length + '/' + this.maxlength
          this.$el.appendChild(node)
          if (this.$el.classList) {
            this.$el.classList.add('el-input__number-word')
          } else if (this.$el.className.indexOf('el-input__number-word') === -1) {
            this.$el.className += ' el-input__number-word'
          }
        }
      })
    }
  }
  Input.updated = function () {
    if (this.numberWord) {
      let node = this.$el.querySelector('.el-input-word-counter')
      if (node) {
        node.innerHTML = this.value.length + '/' + this.maxlength
      }
    }
  }
}

export {
  version,
  locale,
  i18n,
  install,
  CollapseTransition,
  Loading,
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Notification,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Message,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer
}
