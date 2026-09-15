/* TODO: Support for compare and select instructions */
module.exports = grammar({
  name: 'hasm',

  extras: $ => [
    /[ \t\r]/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat(
      choice(
        $.statement,
        $.blank_line
      )
    ),

    statement: $ => seq(
      choice(
        $.label,
        $.instruction
      ),
      '\n'
    ),

    blank_line: $ => '\n',

    label: $ => seq(
      field('name', $.identifier),
      ':'
    ),

    instruction: $ => choice(
      $.rrr_instruction,
      $.rri_instruction,
      $.rr_instruction,
      $.shift_immediate_instruction,
      $.load_instruction,
      $.store_instruction,
      $.branch_instruction,
      $.j_instruction,
      $.conditional_move_instruction,
      $.cs_instruction,
      $.one_operand_instruction,
      $.zero_operand_instruction
    ),

    rrr_instruction: $ => seq(
      field('opcode', $.rrr_opcode),
      field('rd', $.register),
      ',',
      field('rs1', $.register),
      ',',
      field('rs2', $.register)
    ),

    rrr_opcode: $ => token(choice(
      'add',
      'sub',
      'mul',
      'div',
      'rem',
      'and',
      'or',
      'xor',
      'slt',
      'sltu'
    )),

    rri_instruction: $ => seq(
      field('opcode', $.rri_opcode),
      field('rd', $.register),
      ',',
      field('rs1', $.register),
      ',',
      field('immediate', $.number)
    ),

    rri_opcode: $ => token(choice(
      'addi',
      'andi',
      'ori',
      'xori',
      'slti',
      'sltui',
      'jalr'
    )),

    j_instruction: $ => seq(
      field('opcode', $.j_opcode),
      field('rd', $.register),
      ',',
      field('target', $.identifier)
    ),

    j_opcode: $ => token(choice(
      'jal'
    )),

    rr_instruction: $ => seq(
      field('opcode', $.rr_opcode),
      field('rd', $.register),
      ',',
      field('rs1', $.register)
    ),

    rr_opcode: $ => token(choice(
      'sll',
      'slr',
      'sar'
    )),

    shift_immediate_instruction: $ => seq(
      field('opcode', $.shift_immediate_opcode),
      field('rd', $.register),
      ',',
      field('immediate', $.number)
    ),

    shift_immediate_opcode: $ => token(choice(
      'slli',
      'slri',
      'sari'
    )),

    load_instruction: $ => seq(
      field('opcode', $.load_opcode),
      field('rd', $.register),
      ',',
      field('address', choice(
        $.memory,
        $.number
      ))
    ),

    load_opcode: $ => token(choice(
      'lb',
      'lq',
      'lh',
      'lw',
      'lbu',
      'lqu',
      'lhu'
    )),

    store_instruction: $ => seq(
      field('opcode', $.store_opcode),
      field('address', $.memory),
      ',',
      field('rs', $.register)
    ),

    store_opcode: $ => token(choice(
      'sb',
      'sq',
      'sh',
      'sw'
    )),

    memory: $ => seq(
      '[',
      field('base', $.register),
      optional(
        seq(
          field('operator', choice('+', '-')),
          field('offset', choice(
            $.register,
            $.number
          ))
        )
      ),
      ']'
    ),

    branch_instruction: $ => seq(
      field('opcode', $.branch_opcode),
      field('rs1', $.register),
      ',',
      field('rs2', $.register),
      ',',
      field('target', $.identifier)
    ),

    branch_opcode: $ => token(choice(
      'beq',
      'bne',
      'blt',
      'bge',
      'bltu',
      'bgeu'
    )),

    conditional_move_instruction: $ => seq(
      field('opcode', $.conditional_move_opcode),
      field('rd', $.register),
      ',',
      field('value', $.number),
      ',',
      field('condition', $.number)
    ),

    conditional_move_opcode: $ => token(choice(
      'movz',
      'movp',
      'movn'
    )),

    cs_instruction: $ => seq(
      field('opcode', 'cs'),
      field('rd', $.register),
      ',',
      field('rs1', $.register),
      ',',
      field('rs2', $.register),
      ',',
      field('condition', $.condition)
    ),

    condition: $ => token(choice(
      'eq',
      'ne',
      'lt',
      'le',
      'gt',
      'ge',
      'ltu',
      'leu',
      'gtu',
      'geu'
    )),

    one_operand_instruction: $ => seq(
      field('opcode', $.one_operand_opcode),
      field('operand', choice(
        $.register,
        $.identifier,
        $.number
      ))
    ),

    one_operand_opcode: $ => token(choice(
      'not',
      'jmp',
      'call'
    )),

    zero_operand_instruction: $ => field(
      'opcode',
      $.zero_operand_opcode
    ),

    zero_operand_opcode: $ => token(choice(
      'scall',
      'strap',
      'sret',
      'wfi',
      'ret'
    )),

    register: $ => token(
      /r([0-9]|[12][0-9]|3[01])/
    ),

    number: $ => token(
      seq(
        optional('-'),
        choice(
          /[0-9]+/,
          /0[xX][0-9a-fA-F]+/,
          /0[bB][01]+/
        )
      )
    ),

    identifier: $ =>
      token(
        /[a-zA-Z_][a-zA-Z0-9_]*/
      ),

    comment: $ => token(
      seq(
        '#',
        /[^\n]*/
      )
    ),
  },
});

