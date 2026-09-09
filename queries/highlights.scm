; Instructions
(two_operand_opcode) @keyword
(one_operand_opcode) @keyword
(zero_operand_instruction) @keyword

; Width suffixes: .b .w .d .q
(width) @type

; Registers: r0, r1, r31
(register) @variable

; Numbers
(number) @number

; Labels
(label
  name: (identifier) @label)

; Comments
(comment) @comment

; Memory brackets
[
  "["
  "]"
] @punctuation.bracket

; Operators
[
  "+"
  "-"
] @operator

; Commas
"," @punctuation.delimiter
