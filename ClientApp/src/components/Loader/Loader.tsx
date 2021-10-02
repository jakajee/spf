import { Toast } from "bootstrap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import Icon from "../../util/Icon";

let toast: Toast;

export default () => {
    let toastRef = useRef<HTMLDivElement>(null);    
    const utilState = useSelector((appState: ApplicationState) => appState.utilState);      
    const severity = utilState.severity;    

    useEffect(() => {
        toast = new Toast(toastRef.current as Element, {
            autohide: false
        });
        return () => {
            toast.dispose();
        }
    }, []);

    useEffect(() => {
        if (utilState.isLoading === true) {
            toast.show();
        } else if (utilState.isLoading === false) {
            setTimeout(function() {
                toast.hide();
            }, 4000)
        }
    }, [utilState.isLoading]);

    return (
        <div ref={toastRef} className="toast position-fixed bottom-0 end-0 mb-2 me-2" role="alert" aria-live="assertive" aria-atomic="true">            
            <div className={`toast-header bg-${severity} text-white`}>
                <Icon name="info-square" />
                การแจ้งเตือน                
            </div>
            <div className="toast-body">
                {utilState.message}
            </div>
        </div>
    )
}

