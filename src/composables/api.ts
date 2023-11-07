import Config from "@/config"
import type { GalliumApi } from "@/services/gallium"
import { FakeGalliumService } from "@/services/gallium/fake"
import { GalliumService } from "@/services/gallium/webservice"

function useApi(): GalliumApi {
	if (Config.TESTING) {
		return new FakeGalliumService()
	} else {
		return new GalliumService(Config.API_URL, Config.API_KEY)
	}
}

export default useApi