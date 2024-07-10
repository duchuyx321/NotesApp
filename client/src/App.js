import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicRouters } from "./routers";
import DefaultLayout from "~/layouts/DefaultLayout";
import { ContextProvider } from "./hooks/useContext";

function App() {
    return (
        <ContextProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {PublicRouters.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <DefaultLayout>
                                            <Page />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </ContextProvider>
    );
}

export default App;
