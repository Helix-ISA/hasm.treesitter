(r_format_mnemonic) @keyword
(i_format_mnemonic) @keyword
(s_format_mnemonic) @keyword
(b_format_mnemonic) @keyword
(j_format_mnemonic) @keyword

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
