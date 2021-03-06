import { Everything } from "../interfaces";
import { Props, Feature } from "./interfaces";
import {
  selectAllImages,
  getDeviceAccountSettings,
  maybeGetDevice,
  getFirmwareConfig
} from "../resources/selectors";
import {
  sourceFbosConfigValue, sourceFwConfigValue
} from "./components/source_config_value";
import { getFbosConfig } from "../resources/selectors_by_kind";
import {
  determineInstalledOsVersion, validFwConfig, validFbosConfig,
  shouldDisplay as shouldDisplayFunc
} from "../util";
import {
  saveOrEditFarmwareEnv, reduceFarmwareEnv
} from "../farmware/state_to_props";

export function mapStateToProps(props: Everything): Props {
  const { hardware } = props.bot;
  const fbosConfig = validFbosConfig(getFbosConfig(props.resources.index));
  const firmwareConfig = validFwConfig(getFirmwareConfig(props.resources.index));
  const installedOsVersion = determineInstalledOsVersion(
    props.bot, maybeGetDevice(props.resources.index));
  const shouldDisplay =
    shouldDisplayFunc(installedOsVersion, props.bot.minOsFeatureData);
  const env = shouldDisplay(Feature.api_farmware_env)
    ? reduceFarmwareEnv(props.resources.index)
    : props.bot.hardware.user_env;
  return {
    userToApi: props.bot.connectivity["user.api"],
    userToMqtt: props.bot.connectivity["user.mqtt"],
    botToMqtt: props.bot.connectivity["bot.mqtt"],
    deviceAccount: getDeviceAccountSettings(props.resources.index),
    auth: props.auth,
    bot: props.bot,
    dispatch: props.dispatch,
    images: selectAllImages(props.resources.index),
    resources: props.resources.index,
    sourceFbosConfig: sourceFbosConfigValue(fbosConfig, hardware.configuration),
    sourceFwConfig: sourceFwConfigValue(firmwareConfig, hardware.mcu_params),
    shouldDisplay,
    firmwareConfig,
    isValidFbosConfig: !!fbosConfig,
    env,
    saveFarmwareEnv: saveOrEditFarmwareEnv(props.resources.index),
  };
}
