<template>
  <button @click="doYaml2Json">doYaml2Json</button>
  <div id="yamlvue">
    <textarea name="yaml" id="yaml" rows="100" v-model="y"></textarea>
    <textarea
      name="json"
      id="json"
      rows="100"
      :value="json"
      disabled
    ></textarea>
    <div>
      <div
        class="form"
        v-for="resource in Object.keys(templateData?.resources ?? {})"
      >
        <label>resource</label>
        <input type="string" :value="resource" disabled />
        <label>type</label>
        <select
          :value="templateData?.resources?.[resource]?.type ?? ''"
          disabled
        >
          <option value="">--Please choose an option--</option>
          <option
            v-for="resourceType in resourceTypes"
            :key="resourceType"
            :value="resourceType"
          >
            {{ resourceType }}
          </option>
        </select>
        <template
          v-for="property in Object.keys(
            templateData?.resources?.[resource]?.properties ?? {}
          )"
        >
          <template v-if="property === 'networks'">
            <label>{{ property }}</label>
            <template
              v-for="_property in templateData?.resources?.[resource]
                ?.properties?.[property] ?? []"
            >
              <Property
                property="network"
                :properties="_property"
                :resources="resources"
                disabled
              />
            </template>
          </template>
          <template v-else-if="property === 'block_device_mapping'">
            <label>{{ property }}</label>
            <template
              v-for="_property in templateData?.resources?.[resource]
                ?.properties?.[property] ?? []"
            >
              <Property
                property="device_name"
                :properties="_property"
                disabled
              />
              <Property
                property="delete_on_termination"
                :properties="_property"
                disabled
              />
              <Property
                property="volume_id"
                :properties="_property"
                :resources="resources"
                disabled
              />
            </template>
          </template>
          <template v-else>
            <Property
              :type="
                typeof templateData?.resources?.[resource]?.properties?.[
                  property
                ]
              "
              :property="property"
              :properties="templateData?.resources?.[resource]?.properties"
              :resources="resources"
              disabled
            />
          </template>
          <!-- <template
            v-else-if="
              Array.isArray(
                templateData?.resources?.[resource]?.properties?.[property]
              )
            "
          >
            <label>{{ property }}</label>
            <template
              v-for="property1 in templateData?.resources?.[resource]
                ?.properties?.[property] ?? []"
            >
              <input type="string" disabled :value="property1?.network ?? ''" />
            </template>
          </template> -->
        </template>
      </div>
      <!-- <div v-for="parameter in templateData?.parameters ?? []">
        <label>{{ parameter.label }}</label>
        <input
          :type="inputType(parameter?.type) ?? 'string'"
          :placeholder="parameter.description ?? ''"
        />
      </div> -->
      <!-- <div>
        <label>User Name:</label>
        <input
          v-model="templateData.parameters.user_name.default"
          type="text"
          placeholder="User Name"
        />
      </div>
      <div>
        <label>Port Number:</label>
        <input
          v-model.number="templateData.parameters.port_number.default"
          type="number"
          placeholder="Port Number"
        />
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { yaml2obj } from "../script/yaml";

const Property = defineAsyncComponent(() => import("./yaml/Property.vue"));

/** heat template */
const YAML = `heat_template_version: 2021-04-16

resources:
  my_instance:
    type: OS::Nova::Server
    properties:
      name: ljk-test-instance
      image: ubuntu-1
      flavor: flavor-1
      networks:
        - network: { get_resource: my_network}
      key_name: ljk-ssh
      block_device_mapping: [
        {
          device_name: vda,
          volume_id: { get_resource: my_volume},
          delete_on_termination: true,
        },
      ]

  my_volume:
    type: OS::Cinder::Volume
    properties:
      name: ljk-test-volume
      size: 18
      description: ljk's volume

  my_network:
    type: OS::Neutron::Net
    properties:
      name: ljk-test-network

  my_subnet:
    type: OS::Neutron::Subnet
    properties:
      name: ljk-test-subnet
      network: { get_resource: my_network}
      cidr: 192.168.201.0/24

  my_router:
    type: OS::Neutron::Router
    properties:
      name: ljk-test-router
      external_gateway_info:
        network: provider

  my_router_interface:
    type: OS::Neutron::RouterInterface
    properties:
      router: { get_resource: my_router}
      subnet: { get_resource: my_subnet}

  # my_port:
  #   type: OS::Neutron::Port
  #   properties:
  #     name: ljk-test-port
  #     network: { get_resource: my_network}
  #     device_id: { get_resource: my_instance}
`;

const y = ref(YAML);
const templateData = ref<Record<any, any>>({});
const json = computed(() => {
  return JSON.stringify(templateData.value, null, 2);
});

const resourceTypes = [
  "OS::Nova::Server",
  "OS::Cinder::Volume",
  "OS::Neutron::Port",
  "OS::Neutron::RouterInterface",
  "OS::Neutron::Router",
  "OS::Neutron::Subnet",
  "OS::Neutron::Net",
];

/** defined resources on heat template */
const resources = computed(() => {
  return Object.keys(templateData.value?.resources ?? {});
});

const doYaml2Json = () => {
  templateData.value = yaml2obj(y.value);
};

onMounted(() => {
  doYaml2Json();
});
</script>
<style lang="scss" scoped>
#yamlvue {
  display: flex;
  justify-content: space-between;
  > * {
    width: calc(100% / 3 - 8px);
  }
}
div.form {
  > * {
    width: 100%;
  }
}
input,
label {
  width: 100%;
}
div.form:not(:last-child) {
  margin-bottom: 12px;
}
</style>
