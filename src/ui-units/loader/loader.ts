import "./loader.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import LoaderTemplate from "./loader.hbs?raw";
import Store from "../../framework/store/Store";

interface LoaderProps extends BlockOwnProps{
    activeClass: string;
    isActive: boolean;
    text: string;
}

export default abstract class Loader extends Block<LoaderProps> {
    static componentName = 'Loader';
    protected template = LoaderTemplate;
    private activeClass="loader-wrapper--active";

    constructor(props:LoaderProps){
        super(props)
        this.props.activeClass = this.activeClass;

        if(!props.text){
            this.props.text = "В процессе...";
        }
    }

    protected componentDidMount(): void {
        this.removeStoreListeners = Store.subscribe(
            this.loaderHandler
        )
    }

    private loaderHandler = ()=>{
        const isActive = Store.getState().isLoaderActive as boolean;

        if(isActive){
            this.show()
        }
        else{
            this.loaderHide();
        }
    }

    show = ()=>{
        this.setProps({isActive: true});
    }

    loaderHide=()=>{
        this.setProps({isActive: false});
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners();
    }
}
