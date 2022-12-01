import "./LoadingWindow.css"

export function LoadingWindow({loadingWindowHeight}) {




    return (
        <div className="loading-window" style={{height: loadingWindowHeight}} >
            <p>loading</p>
        </div>
    )
}