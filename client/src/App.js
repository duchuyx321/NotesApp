import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicRouters, PrivateRouters } from "./routers";
import DefaultLayout from "~/layouts/DefaultLayout";
import Admin from "./layouts/Admin";
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

                        {PrivateRouters.map((item, index) => {
                            const Page = item.component;
                            return (
                                <Route
                                    key={index}
                                    path={item.path}
                                    element={
                                        <Admin>
                                            <Page />
                                        </Admin>
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
