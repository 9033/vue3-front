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
          <option value="OS::Nova::Server">OS::Nova::Server</option>
          <option value="OS::Cinder::Volume">OS::Cinder::Volume</option>
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
              <input type="string" disabled :value="_property?.network ?? ''" />
            </template>
          </template>
          <template v-else-if="property === 'block_device_mapping'">
            <label>{{ property }}</label>
            <template
              v-for="_property in templateData?.resources?.[resource]
                ?.properties?.[property] ?? []"
            >
              <Property property="device_name" :properties="_property" />
              <Property
                property="delete_on_termination"
                :properties="_property"
              />
              <label>volume_id</label>
              <template v-if="typeof _property?.volume_id === 'object'">
                <input
                  type="string"
                  disabled
                  :value="_property?.volume_id?.get_resource"
                />
              </template>
              <template v-else>
                <input
                  type="string"
                  disabled
                  :value="_property?.volume_id ?? ''"
                />
              </template>
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
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  onMounted,
  ref,
} from "vue";
// import yaml from "js-yaml";
import { yaml2obj, inputType } from "../script/yaml";

const Property = defineAsyncComponent(() => import("./yaml/Property.vue"));

const YAML2 = `heat_template_version: 2021-04-16

resources:
  my_instance:
    type: OS::Nova::Server
    properties:
      name: instance-1
      image: image-1
      flavor: flavor-1
      networks:
        - network: network-1
      key_name: ssh-1
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
      name: volumn-1
      size: 20
`;

/** heat template */
// const YAML = `heat_template_version: 2016-10-14

// description:
//   # a description of the template

// parameter_groups:
//   # a declaration of input parameter groups and order

// parameters:
//   # declaration of input parameters
//   user_name:
//     type: string
//     label: User Name
//     description: User name to be configured for the application
//     constraints:
//       - length: { min: 6, max: 8 }
//         description: User name must be between 6 and 8 characters
//       - allowed_pattern: "[A-Z]+[a-zA-Z0-9]*"
//         description: User name must start with an uppercase character
//   port_number:
//     type: number
//     label: Port Number
//     description: Port number to be configured for the web server
//   instance_type:
//     type: string
//     label: Instance Type
//     description: Instance type for compute instances
//     constraints:
//       - allowed_values:
//         - m1.small
//         - m1.medium
//         - m1.large

// resources:
//   # declaration of template resources
//   my_instance:
//     type: OS::Nova::Server
//     properties:
//       flavor: m1.small
//       image: F18-x86_64-cfntools

//   server1:
//     type: OS::Nova::Server
//     depends_on: server2

//   server2:
//     type: OS::Nova::Server
//     properties:
//       # general properties ...
//       user_data:
//         str_replace:
//           template: |
//             #!/bin/bash
//             echo "Hello world"
//             echo "Setting MySQL root password"
//             mysqladmin -u root password $db_rootpassword
//             # do more things ...
//           params:
//             $db_rootpassword: { get_param: DBRootPassword }

//   server3:
//     type: OS::Nova::Server
//     depends_on: [ server1, server2 ]

// outputs:
//   # declaration of output parametersoutputs:
//   instance_ip:
//     description: IP address of the deployed compute instance
//     value: { get_attr: [my_instance, first_address] }

// conditions:
//   # declaration of conditions
// `;

const y = ref(YAML2);
const templateData = ref<Record<any, any>>({});
const json = computed(() => {
  return JSON.stringify(templateData.value, null, 2);
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
