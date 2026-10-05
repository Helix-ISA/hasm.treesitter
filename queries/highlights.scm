(r_type_mnemonic) @keyword
(i_type_mnemonic) @keyword
(s_type_mnemonic) @keyword
(b_type_mnemonic) @keyword
(j_type_mnemonic) @keyword

(register) @variable
(number) @number

(label
  name: (identifier) @label)

(b_type_format
  symbol: (identifier) @function)

(j_type_format
  symbol: (identifier) @function)

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
