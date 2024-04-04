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
      <div v-for="parameter in templateData?.parameters ?? []">
        <label>{{ parameter.label }}</label>
        <input
          :type="inputType(parameter?.type) ?? 'string'"
          :placeholder="parameter.description ?? ''"
        />
      </div>
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
import { computed, onMounted, ref } from "vue";
// import yaml from "js-yaml";
import { yaml2obj, inputType } from "../script/yaml";

const YAML2 = `heat_template_version: 2016-10-14

parameters:
  # declaration of input parameters  
  user_name:
    type: string
    label: User Name
    description: User name to be configured for the application    
    constraints:
      - length: { min: 6, max: 8 }
        description: User name must be between 6 and 8 characters
      - allowed_pattern: "[A-Z]+[a-zA-Z0-9]*"
        description: User name must start with an uppercase character
  port_number:
    type: number
    label: Port Number
    description: Port number to be configured for the web server
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
</style>
