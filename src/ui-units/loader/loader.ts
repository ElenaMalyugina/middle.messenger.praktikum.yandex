import "./loader.css";
import Block, { type BlockOwnProps } from "../../framework/Block";
import LoaderTemplate from "./loader.hbs?raw";
import Store from "../../framework/store/Store";

interface LoaderProps extends BlockOwnProps{
    activeClass: string;
    isActive: boolean;
}

export default abstract class Loader extends Block<LoaderProps> {
    static componentName = 'Loader';
    protected template = LoaderTemplate;
    private activeClass="loader-wrapper--active";

    constructor(props:LoaderProps){
        super(props)
        this.props.activeClass = this.activeClass;

        Store.subscribe(()=>{
            this.loaderHandler();
        })
    }

    private loaderHandler = ()=>{
        const isActive = Store.getState().isLoaderActive as boolean;

        if(isActive){
            this.show()
        }
        else{
            this.hide();
        }
    }

    show = ()=>{
        this.setProps({isActive: true});
    }

    hide=()=>{
        this.setProps({isActive: false});
    }
}
