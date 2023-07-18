import Config from "@/config"
import type { Api } from "@/services"
import FakeApi from "@/services/fakeapi"

function useApi(): Api {
	// if (Config.TESTING) {
		return new FakeApi()
	// } else {
		// return new Api() 
	// }
}

export default useApi