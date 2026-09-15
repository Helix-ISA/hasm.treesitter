(rrr_opcode) @keyword
(rri_opcode) @keyword
(rr_opcode) @keyword
(j_opcode) @keyword
(shift_immediate_opcode) @keyword
(load_opcode) @keyword
(store_opcode) @keyword
(branch_opcode) @keyword
(conditional_move_opcode) @keyword
(zero_operand_opcode) @keyword
(one_operand_opcode) @keyword

(register) @variable
(number) @number

(label
  name: (identifier) @label)

(branch_instruction
  target: (identifier) @function)

(j_instruction
  target: (identifier) @function)

(comment) @comment

[
  "["
  "]"
] @punctuation.bracket

[
  "+"
  "-"
] @operator

"," @punctuation.delimiter
