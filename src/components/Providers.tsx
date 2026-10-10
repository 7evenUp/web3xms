import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Toaster } from "sonner"
import SoundProvider from "./SoundProvider"
import { store } from "@/redux/store"
const persistor = persistStore(store)
const Providers = ({ children }: { children: React.ReactNode }) => (
  <ReduxProvider store={store}>
    <SoundProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster richColors />
      </PersistGate>
    </SoundProvider>
  </ReduxProvider>
)
export default Providers
