class AddFirmwareConfsToFbosConfigs < ActiveRecord::Migration[5.2]
  def change
    add_column :fbos_configs, :firmware_path,      :string
    safety_assured do # This table is small enough to not worry about.
      add_column :fbos_configs, :firmware_debug_log, :boolean, default: false
    end
  end
end
